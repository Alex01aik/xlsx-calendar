import * as XLSX from 'xlsx';

export const getData = async () => {
  const res =
    process.env.REACT_APP_IS_LOCAL_DATA === 'false'
      ? await fetch(process.env.REACT_APP_DATA_URL ?? '')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not okl');
            }
            return response.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.error('There was a problem fetching the file:', error);
          })
      : await fetch(process.env.PUBLIC_URL + '/data.xlsx')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not okl');
            }
            return response.arrayBuffer();
          })
          .then((data) => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            return jsonData.filter((value) => (value as unknown as string).length > 0);
          })
          .catch((error) => {
            console.error('There was a problem fetching the file:', error);
          });

  return res;
};
