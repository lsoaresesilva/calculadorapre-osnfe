import { CalculadoranfePage } from './app.po';

describe('calculadoranfe App', () => {
  let page: CalculadoranfePage;

  beforeEach(() => {
    page = new CalculadoranfePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
