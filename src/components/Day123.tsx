import { useState } from 'react';

// Day 123
// Expense Tracker

type Category = 'Food' | 'Transport' | 'Tech' | 'Entertainment';

interface Expense {
    id: number;
    title: string;
    amount: number;
    category: Category;
}

function Day123() {
    const [expenses, setExpenses] = useState<Expense[]>([
        {id: 1, title: 'Lunch at a cafe', amount: 12.5, category: 'Food'},
        {id: 2, title: 'Bus ticket', amount: 3, category: 'Transport'},
        {id: 3, title: 'Wireless mouse', amount: 30, category: 'Tech'},
    ]);
    const [expenseTitle, setExpenseTitle] = useState<string>('');
    const [expenseAmount, setExpenseAmount] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('Food');
    const [filter, setFilter] = useState<Category | 'All'>('All');

    const BUDGET_LIMIT = 500;

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const handleAddExpense = () => {
        if (expenseTitle === '' || expenseAmount === '') return;

        const newExpense = {
            id: Date.now(),
            title: expenseTitle,
            amount: Number(expenseAmount),
            category: selectedCategory,
        }

        setExpenses([...expenses, newExpense]);
        setExpenseTitle('');
        setExpenseAmount('');
        setSelectedCategory('Food');
    }

    const handleDelete = (id: number) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    }

    const filteredExpenses = filter === 'All' 
        ? expenses 
        : expenses.filter(expense => expense.category === filter);

    return (
        <div>
            <div>
                <h2>Expense Tracker 💳</h2>
                <p>Total Spent: {totalAmount}</p>
                <p>{totalAmount > BUDGET_LIMIT ? '⚠️ Over budget! (500)' : 'The limit has not been exceeded'}</p>
            </div>

            <div>
                <input type='text' placeholder='Expense title...' value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)}/>
                <input type='number' placeholder='Expense amount...' value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)}/>
                <select id='select-category' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category)}>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Tech">Tech</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                <button disabled={expenseTitle === '' || expenseAmount === ''} onClick={handleAddExpense}>Add Expense</button>
            </div>

            <div>
                <h3>Filtering panel</h3>
                <select id='filter-select' value={filter} onChange={(e) => setFilter(e.target.value as Category | 'All')}>
                    <option value="All">All</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Tech">Tech</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>

            <div>
                <h3>List of expenses</h3>

                {filteredExpenses.length === 0 ? (
                    <p>No expenses found in this category</p>
                ) : (
                        <div>
                            {filteredExpenses.map((expense) => 
                                <div key={expense.id}>
                                    <h4>{expense.title} - {expense.amount}</h4>
                                    <p>{expense.category}</p>
                                    <button onClick={() => handleDelete(expense.id)}>Delete 🗑️</button>
                                </div>
                            )}
                        </div>
                    )    
                }
            </div>
        </div>
    );
}

export default Day123;