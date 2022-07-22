import { userGenerator } from '../../src/test/data/data-generators';

describe('smoke', () => {
  it('should handle normal app flow', () => {
    const user = userGenerator();

    // サインアップ
    cy.visit('/auth/register');

    cy.findByRole('textbox', {
      name: /username/i,
    }).type(user.username);
    
    cy.findByRole('textbox', {
      name: /email/i,
    }).type(user.email);
    
    cy.findByLabelText(/password/i).type(user.password);

    cy.findByRole('button', {
      name: /sign up/i,
    }).click();

    cy.findByRole('button', {
      name: /get started/i,
    }).click();

    cy.findByText(`Hello, ${user.username}`).should('exist');

    // ログアウト
    cy.get('[aria-label="logout"]').click();

    // ログイン
    cy.visit('/auth/login');

    cy.findByRole('textbox', {
      name: /email/i,
    }).type(user.email);

    cy.findByLabelText(/password/i).type(user.password);

    cy.findByRole('button', {
      name: /log in/i,
    }).click();

    cy.findByText(`Hello, ${user.username}`).should('exist');

    // マイページ閲覧
    cy.get('[aria-label="mypage"]').click();

    cy.findByText('No Quizzes Found').should('exist');

    // クイズ作成
    cy.findByRole('button', {
      name: /post a quiz/i,
    }).click();

    cy.findByRole('textbox', {
      name: /title/i,
    }).type('This is my first test');

    cy.get('[aria-label=create-quiz]').click()

    cy.addQuestion({ content: 'first_quiz' });
    cy.addQuestion({ content: 'second_quiz' });
    cy.addQuestion({ content: 'third_quiz' });
    cy.addQuestion({ content: 'fourth_quiz' });
    cy.addQuestion({ content: 'fifth_quiz' });

    cy.findByRole('button', {
      name: '送信',
    }).click();

    cy.findByText('This is my first test').should('exist');
    
    // クイズ検索
    cy.visit('/app');

    cy.get('[placeholder="Search quiz"]').type("This is my first test");
    
    cy.get('[aria-label=search-quiz]').click()
  
    cy.findByText('This is my first test').should('exist');

    // クイズ削除
    cy.visit('/app/quiz/mypage');

    cy.get('[aria-label="delete-quiz"]').click();
    
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('本当に削除してもよいですか？');
    });

    cy.findByText('No Quizzes Found').should('exist');
  });
});
