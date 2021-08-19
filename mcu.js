const MCUData = {
  original: {
    category: "MCU",
    partNumber: "STM32F446RCT6",
    lists: [
      {
        site: "마우저",
        link: "https://kr.mouser.com/ProductDetail/STMicroelectronics/STM32F446RCT6?qs=Ok1pvOkw6%2FrlZ63GppV%2FkA%3D%3D",
        inStock: "",
        unitPrice: "",
      },
      {
        site: "디지키",
        link: "https://www.digikey.kr/products/ko?keywords=STM32F446RCT6",
        inStock: "",
        unitPrice: "",
      },
    ],
  },
};

async function getMcuData(driver) {
  await 마우저(driver);
  await 디지키(driver);
  await MCUCreateRow();
}

// function setDateNow() {
//   const date = new Date();
//   MCUData.currentDate = `${date.getFullYear()}년${date.getMonth() + 1}월${date.getDay() + 1}일`;
//   dateNow.innerHTML = `${MCUData.currentDate}`;
// }

async function 마우저(driver) {
  await driver.get(MCUData.original.lists[0].link);
  MCUData.original.lists[0].inStock = await driver.findElement(By.css(".onOrderQuantity")).getText();
  const mouserRow = await driver.findElement(By.css(".pricing-table tbody tr:nth-child(1)"));
  MCUData.original.lists[0].unitPrice = await mouserRow.findElement(By.css("td:nth-child(2)")).getText();
}

async function 디지키(driver) {
  await driver.get(MCUData.original.lists[1].link);

  const digiKeyTbody = await driver.findElement(By.id("lnkPart"));
  const digiKeyRows = await digiKeyTbody.findElements(By.css("tr"));

  for (let row of digiKeyRows) {
    let string = await row.getText();
    if ((await string.indexOf("497-17472-ND")) !== -1) {
      MCUData.original.lists[1].inStock = await row.findElement(By.css(".tr-qtyAvailable")).getText();
      MCUData.original.lists[1].unitPrice = await row.findElement(By.css(".tr-unitPrice")).getText();
    }
  }
}

async function MCUCreateRow() {
  for (list of MCUData.original.lists) {
    let row = body.insertRow();

    row.insertCell(0).innerText = `${MCUData.original.category}`;
    row.insertCell(1).innerText = `${MCUData.original.partNumber}`;
    row.insertCell(2).innerText = `${list.site}`;
    row.insertCell(3).innerText = `${list.inStock}EA`;
    const price = list.unitPrice.split(".");
    row.insertCell(4).innerText = `${price[0]}`;
  }
}
