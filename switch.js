const switchData = {
  category: "SWITCH",
  partNumber: "SKPGACE010",
  site: "레오콤",
  link: "http://www.leocom.kr/GID/2783150",
  inStocks: [],
};

async function getSwitchData() {
  let driver = await new Builder().forBrowser("chrome").build();
  await 레오콤(driver);
  await SWITCHCreateRow();
}

async function 레오콤(driver) {
  try {
    await driver.get(switchData.link);
    const tableRows = await driver.findElements(By.css("#pd_tab_c1 table tr"));

    for (let i = 0; tableRows.length; i++) {
      let pn = await tableRows[i].findElements(By.css("td .newBgcolor:nth-child(6)"));

      for (let j = 0; j < pn.length; j++) {
        let stockNumber = await pn[j].findElement(By.css("span")).getText();
        await switchData.inStocks.push(stockNumber);
      }
    }
  } catch (error) {}
}

async function SWITCHCreateRow() {
  for (let i = 0; i < switchData.inStocks.length; i++) {
    let row = body.insertRow();

    row.insertCell(0).innerText = `${switchData.category}`;
    row.insertCell(1).innerText = `${switchData.partNumber}`;
    row.insertCell(2).innerText = `${switchData.site}`;
    row.insertCell(3).innerText = `${switchData.inStocks[i]} EA`;
    row.insertCell(4).innerText = `개별견적`;
  }
}
