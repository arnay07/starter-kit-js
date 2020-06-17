import {expect} from 'chai';
import jsdom from "jsdom";
import fs from "fs"


describe("First test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe("index.html", () => {
  it("should say hello", (done) => {
    const index = fs.readFileSync('./src/index.html', "utf-8");
    /* you can pass an array of js files to load into the jsdom env as the second parameter*/
    /*this is asynchronous so we add done so that expect might be run add done so that mocha
    knows that the test is asynchronous*/
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Hello world");
      done();
      window.close();
    });
  })
})
