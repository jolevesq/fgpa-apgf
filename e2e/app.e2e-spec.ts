import { FgpaPage } from './app.po';

describe('fgpa App', () => {
  let page: FgpaPage;

  beforeEach(() => {
    page = new FgpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
