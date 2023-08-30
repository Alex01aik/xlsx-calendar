import { getData } from '../api/getData';
// import { MessageAuthor } from '../enums/MessageAuthor';
import { EventType } from '../types/EventType';
import { MessageType } from '../types/MessageType';
import { OrganizationType } from '../types/OrganizationType';

export interface State {
  events: EventType[];
  organizations: OrganizationType[];
  subOrganizations: string[];
  actualOrganizations: OrganizationType[];
  // TODO when realise chat support messages: MessageType[];
}

export enum Action {
  setEvents = 'setEvents',
  setMessages = 'setMessages',
  setOrganizations = 'setOrganizations',
  setActualOrganizations = 'setActualOrganizations',
}

export type ActionType =
  | { type: Action.setEvents; data: EventType[] }
  | { type: Action.setMessages; data: MessageType[] }
  | {
      type: Action.setOrganizations;
      data: OrganizationType[];
    }
  | {
      type: Action.setActualOrganizations;
      data: OrganizationType[];
    };

export const initialState: State = {
  events: [],
  organizations: [],
  subOrganizations: [],
  actualOrganizations: [],
  // TODO when realise chat support messages: [
  //   {
  //     author: MessageAuthor.Whensy,
  //     message: "I'm glad to answer your questions.",
  //   },
  // ],
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case Action.setEvents:
      return { ...state, events: [...action.data] };
    case Action.setActualOrganizations:
      return {
        ...state,
        actualOrganizations: Array.from(action.data),
      };
    case Action.setOrganizations:
      return {
        ...state,
        organizations: Array.from(action.data),
      };
    // TODO when realise chat support case Action.setMessages:
    //   return { ...state, messages: [...state.messages, ...action.data] };
    default:
      return state;
  }
};

export const search = async (
  dispatch: React.Dispatch<ActionType>,
  state: State,
  message: string,
) => {
  const response = await getData();

  if (response) {
    const { events } = formatData(response);

    const searchEvents = events.filter((event) =>
      Object.values(event).some(
        (item) => item?.toString().toLowerCase().includes(message.toLowerCase()),
      ),
    );

    const organizations: OrganizationType[] = [];

    searchEvents.map((item) => {
      if (item?.organization) {
        const existed = organizations.find((value) => value.name === item.organization);
        if (existed) {
          if (item?.subOrganization) {
            const newSubs = existed.subs
              ? new Set([...existed.subs, item.subOrganization])
              : [item.subOrganization];

            organizations[organizations.indexOf(existed)] = {
              name: existed.name,
              subs: Array.from(newSubs),
            };
          }
        } else {
          if (item?.subOrganization) {
            organizations.push({
              name: item.organization,
              subs: [item.subOrganization],
            });
          } else {
            organizations.push({
              name: item.organization,
            });
          }
        }
      }
    });

    if (message === '') {
      await getEvents(dispatch);
    } else {
      dispatch({ type: Action.setEvents, data: searchEvents });
      dispatch({ type: Action.setActualOrganizations, data: organizations });
    }
  }

  // TODO when realise chat support
  // const searchMessage = searchEvents.length
  //   ? searchEvents.reduce((str, item, index) => {
  //       return (
  //         str +
  //         `${index + 1}. ${item.time} ${item.title} at ${item.date} ${
  //           index + 1 < searchEvents.length ? ', ' : ''
  //         }\n`
  //       );
  //     }, 'There are events:\n')
  //   : 'There are no events(';

  // dispatch({
  //   type: Action.setMessages,
  //   data: [
  //     {
  //       author: MessageAuthor.You,
  //       message,
  //     },
  //     {
  //       author: MessageAuthor.Whensy,
  //       message: searchMessage,
  //     },
  //   ],
  // });
};

export const getEvents = async (dispatch: React.Dispatch<ActionType>) => {
  const response = await getData();

  if (response) {
    const { events, organizations } = formatData(response);
    dispatch({ type: Action.setEvents, data: events });
    dispatch({ type: Action.setActualOrganizations, data: organizations });
    dispatch({ type: Action.setOrganizations, data: organizations });
  }
};

export const getEventsByCategory = async (
  dispatch: React.Dispatch<ActionType>,
  orgs: OrganizationType[],
) => {
  const response = await getData();

  if (response) {
    const { events } = formatData(response);

    const filteredEvents = events.filter((event) => {
      return orgs.find((org) =>
        event.subOrganization
          ? event.organization === org.name && org.subs?.includes(event.subOrganization)
          : event.organization === org.name,
      );
    });

    dispatch({ type: Action.setEvents, data: orgs.length ? filteredEvents : events });
    dispatch({ type: Action.setActualOrganizations, data: orgs });
  }
};

const formatData = (
  fileData: any[],
): {
  events: EventType[];
  organizations: OrganizationType[];
} => {
  const events: EventType[] = [];
  const organizations: OrganizationType[] = [];

  if (fileData.length) {
    const keys = fileData[0];
    const dateColumnIndex = keys.indexOf('Date');

    for (let i = 1; i < fileData.length; i++) {
      if (new Date(fileData[i][dateColumnIndex]) > new Date()) {
        let item: any = {};

        for (const [index, key] of keys.entries()) {
          if (key === 'Sub-Organization') {
            item = { ...item, subOrganization: fileData[i][index] };
          } else {
            item = { ...item, [key.toLowerCase()]: fileData[i][index] };
          }
        }

        if (item?.organization) {
          const existed = organizations.find((value) => value.name === item.organization);
          if (existed) {
            if (item?.subOrganization) {
              const newSubs = existed.subs
                ? new Set([...existed.subs, item.subOrganization])
                : [item.subOrganization];

              organizations[organizations.indexOf(existed)] = {
                name: existed.name,
                subs: Array.from(newSubs),
              };
            }
          } else {
            if (item?.subOrganization) {
              organizations.push({
                name: item.organization,
                subs: [item.subOrganization],
              });
            } else {
              organizations.push({
                name: item.organization,
              });
            }
          }
        }

        events.push(item as EventType);
      }
    }

    events.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  }
  return { events, organizations };
};
