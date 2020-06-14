import chai from "chai";
import jsdom from 'jsdom';

describe('Our First Test', () => {
  it('should pass', () => {
    chai.expect(true).to.equal(true);
  });
});

describe('index.html', () => { // eslint-disable-line
  it('should say have h1 that says Users' , (done) => { // eslint-disable-line
    const options = { }
    jsdom.JSDOM.fromFile('./src/index.html', options).then(dom => {
      const h1 = dom.window.document.getElementsByTagName('h1')[0]
      chai.expect(h1.innerHTML).to.equal('Users')
      done()
    }).catch(done)
  })
})

