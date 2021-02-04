/**
 * Processes and parses CSV or DSV
 *
 * @export
 * @param {string} csvString
 * @param {','|';'} delimiter
 * @returns {object[]}
 */
export function processCsv(csvString, delimiter) {
  const withoutStrings = csvString.trim().replace(/"/g, '');
  const data = [];
  const [headerLine, ...rows] = withoutStrings.split('\n');
  const header = headerLine.split(delimiter);
  for (let i = 0, len = rows.length; i < len; i++) {
    const obj = {};
    rows[i].split(delimiter).forEach((column, index) => {
      obj[header[index]] = column;
    });
    data.push(obj);
  }
  return data;
}

/**
 * Processes data as latitude longitude
 *
 * @export
 * @param {object[]} data
 * @param {string} latCol
 * @param {string} lonCol
 * @param {string} iconCol
 * @returns {{latLng: number[], icon: string}}
 */
export function getLatLons(data, latCol, lonCol, iconCol) {
  if (latCol === '' || lonCol === '' || iconCol === '') {
    return [];
  }

  console.log(latCol, lonCol, iconCol);

  return data.map((d) => ({
      latLng: [Number(d[latCol]), Number(d[lonCol])],
      icon: d[iconCol],
    }));
}
