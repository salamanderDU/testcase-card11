const puppeteer = require('puppeteer');

const MainThemeColor = "rgb(42, 69, 203)"
const ContentPageColor = "rgb(50, 79, 195)"
const ButtonColor = "rgb(23, 21, 137)"
const BackgroundColor = "rgb(22, 166, 227)"
const FrameColor = "rgb(23, 32, 94)"
const CommonTextColor = "rgb(201, 24, 68)"
const HintTextColor = "rgb(81, 127, 219)"
const TitleColor = "rgb(0, 0, 0)"

const adminUser = 'admin'
const adminPass = 'UYDUEdDQ4P'

const normalUser = 'duke'
const normalPass = 'pp74287428'

async function loginAdmin(page){
  let inputUser = await page.$("#id_username")
  await inputUser.focus()
  await inputUser.type(adminUser)
  let inputPass = await page.$("#id_password")
  await inputPass.focus()
  await inputPass.type(adminPass)
  let sumitButton = await page.$("[name='submit']")
  await sumitButton.click()
}

async function loginUser(page){
  let inputUser = await page.$("#id_username")
  await inputUser.focus()
  await inputUser.type(normalUser)
  let inputPass = await page.$("#id_password")
  await inputPass.focus()
  await inputPass.type(normalPass)
  let sumitButton = await page.$("[name='submit']")
  await sumitButton.click()
}

async function gotoHomePage(page){
  await page.goto('http://127.0.0.1:8000/');
}

async function testFrameColor(page){
  let frame = await page.$eval(".center-block", el => getComputedStyle(el).backgroundColor)
  await console.log("FrameColor")
  await console.log(frame === FrameColor)
}

async function testMainThemeColor(page){
  let menu = await page.$eval("#menu-main", el => getComputedStyle(el).backgroundColor)
  await console.log("MainThemeColor")
  await console.log(menu===MainThemeColor) 
}

async function testButtonColor(page){
  let submit = await page.$eval("[type='submit']", el => getComputedStyle(el).backgroundColor)
  await console.log("ButtonColor")
  await console.log(submit===ButtonColor) 
}

async function testContentPageColor(page){
  let content = await page.$eval("#viewport [href='/documents/documents/favorites/'] > .panel-footer", el => getComputedStyle(el).backgroundColor)
  await console.log("ContentPageColor")
  await console.log(content===ContentPageColor) 
}

async function testHintTextColor(page){
  let hint = await page.$eval("#viewport [href='/documents/documents/favorites/'] > .panel-footer", el => getComputedStyle(el).color)
  await console.log("HintTextColor")
  await console.log(hint===HintTextColor) 
}

async function testTitleColor(page){
  let titleText = await page.$eval("#content-title", el => getComputedStyle(el).color)
  await console.log("TitleColor")
  await console.log(titleText===TitleColor)
}

async function testBackgroundColor(page){
  let background = await page.$eval("body", el => getComputedStyle(el).backgroundColor)
  await console.log("BackgroundColor")
  await console.log(background===BackgroundColor) 
}

async function gotoCreatTag(page){
  await page.goto('http://127.0.0.1:8000/tags/tags/create/')
}

async function testCommonTextColor(page){
  let commonText = await page.$eval("[action] > div:nth-of-type(1)", el => getComputedStyle(el).color)
  await console.log("CommonTextColor")
  await console.log(commonText===CommonTextColor)
}

async function AdminTest(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1120,
    height: 980,
    deviceScaleFactor: 1,
  });
  await gotoHomePage(page)
  await page.waitForTimeout(4000)
  let titleLogin = await page.title()
  await console.log(titleLogin)
  await loginAdmin(page)
  await page.waitForTimeout(9000)
  let titleHome = await page.title()
  await console.log(titleHome)
  
  await testFrameColor(page)
  await testMainThemeColor(page)
  await testButtonColor(page)
  await testContentPageColor(page)
  await testHintTextColor(page)
  await testTitleColor(page)
  await testBackgroundColor(page)
  await page.screenshot({ path: 'hompageadmin.png' });

  await gotoCreatTag(page)
  await page.waitForTimeout(9000)
  await testCommonTextColor(page)
  await page.screenshot({ path: 'createTagpageadmin.png' });

  await browser.close();
};
async function UserTest(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1120,
    height: 980,
    deviceScaleFactor: 1,
  });
  await gotoHomePage(page)
  await page.waitForTimeout(4000)
  await loginUser(page)
  await page.waitForTimeout(9000)
  
  await testFrameColor(page)
  await testMainThemeColor(page)
  await testButtonColor(page)
  await testContentPageColor(page)
  await testHintTextColor(page)
  await testTitleColor(page)
  await testBackgroundColor(page)
  await page.screenshot({ path: 'hompageuser.png' });

  await (await page.$('.nav > li:nth-of-type(1) > .dropdown-toggle')).click()
  await page.screenshot({ path: 'clicksystem.png' });
  await (await page.$("[href='/setup/']")).click()
  await page.waitForTimeout(4000)
  await page.screenshot({ path: 'setupPage.png' });
  let title = await page.title()
  await console.log(title)

  await page.goto('http://127.0.0.1:8000/appearance/user/theme/edit/')
  await page.waitForTimeout(4000)
  let titlethemeset = await page.title()
  await console.log(titlethemeset)
  await page.screenshot({ path: 'userThemeSetting.png' });

  await browser.close();
};


async function maintest(){
  await console.log("--------admin-------")
  await AdminTest()
  await console.log("\n--------user-------")
  await UserTest()
}

maintest()