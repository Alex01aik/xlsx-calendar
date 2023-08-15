import { getData } from '../api/getData';
import { MessageAuthor } from '../enums/MessageAuthor';
import { EventType } from '../types/EventType';
import { MessageType } from '../types/MessageType';

export interface State {
  events: EventType[];
  categories: string[];
  actualCategories: string[];
  messages: MessageType[];
}

export enum Action {
  setEvents = 'setEvents',
  setCategories = 'setCategories',
  setActualCategories = 'setActualCategories',
  setMessages = 'setMessages',
}

export type ActionType =
  | { type: Action.setEvents; data: EventType[] }
  | { type: Action.setCategories; data: Set<string> }
  | { type: Action.setActualCategories; data: string[] }
  | { type: Action.setMessages; data: MessageType[] };

export const initialState: State = {
  events: [],
  categories: [],
  actualCategories: [],
  messages: [
    {
      author: MessageAuthor.Whensy,
      message: "I'm glad to answer your questions.",
    },
  ],
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case Action.setEvents:
      return { ...state, events: [...action.data] };
    case Action.setCategories:
      return { ...state, categories: Array.from(action.data) };
    case Action.setActualCategories:
      return { ...state, actualCategories: action.data };

    case Action.setMessages:
      return { ...state, messages: [...state.messages, ...action.data] };
    default:
      return state;
  }
};

export const search = async (
  dispatch: React.Dispatch<ActionType>,
  state: State,
  message: string,
) => {
  const searchEvents = state.events.filter((event) =>
    Object.values(event).some(
      (item) => item?.toString().toLowerCase().includes(message.toLowerCase()),
    ),
  );
  const searchMessage = searchEvents.length
    ? searchEvents.reduce((str, item, index) => {
        return (
          str +
          `${index + 1}. ${item.time} ${item.title} at ${item.date} ${
            index + 1 < searchEvents.length ? ', ' : ''
          }\n`
        );
      }, 'There are events:\n')
    : 'There are no events(';

  dispatch({
    type: Action.setMessages,
    data: [
      {
        author: MessageAuthor.You,
        message,
      },
      {
        author: MessageAuthor.Whensy,
        message: searchMessage,
      },
    ],
  });
};

export const getEvents = async (dispatch: React.Dispatch<ActionType>) => {
  const response = await getData();

  if (response) {
    const { events, categories } = formatData(response);
    dispatch({ type: Action.setEvents, data: events });
    dispatch({ type: Action.setCategories, data: categories });
    dispatch({ type: Action.setActualCategories, data: Array.from(categories) });
  }
};

export const getEventsByCategory = async (
  dispatch: React.Dispatch<ActionType>,
  categories: string[],
) => {
  const response = await getData();

  if (response) {
    const { events } = formatData(response);
    const filteredEvents = events.filter((event) => categories.includes(event.category));

    dispatch({ type: Action.setEvents, data: categories.length ? filteredEvents : events });
    dispatch({ type: Action.setActualCategories, data: categories });
  }
};

const formatData = (fileData: any[]): { events: EventType[]; categories: Set<string> } => {
  const events: EventType[] = [];
  const categories = new Set<string>();

  if (fileData.length) {
    const keys = fileData[0];

    for (let i = 1; i < fileData.length; i++) {
      let item: any = {};

      for (const [index, key] of keys.entries()) {
        item = { ...item, [key.toLowerCase()]: fileData[i][index] };
      }

      if (item?.category) {
        categories.add(item.category);
      }

      events.push(item as EventType);
    }
  }

  return { events, categories };
};
