import appSettings from "../utilities/appSettings";

export function getSumArray(total, num) {
    return total + num;
  }

// komplikacije teže jer sam si takav model glupi složio, a nije mi se dalo mjenjat to sve
// zato je try-catch u slucaju errora 
export function mapperBoardIdToDisplayNameMapper(id) {
  try {
      let bigIndex = appSettings._boardModel.filter(el => el.data[el.data.length - 1].betID < id);
      let field = appSettings._boardModel[bigIndex.length].data.find(d => d.betID == id);
      return field.label;
  }
  catch(e) {
    console.error(e);
  }
}