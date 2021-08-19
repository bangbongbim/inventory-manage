(async function getData() {
  console.log("hi");
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await getMcuData(driver);
    await getSwitchData(driver);
  } catch (error) {
    console.log(error);
  } finally {
    driver.quit();
  }
})();
