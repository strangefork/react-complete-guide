import { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [formTitle, setFormTitle] = useState('');
    const [formAmount, setFormAmount] = useState('');
    const [formDate, setFormDate] = useState('');

    // const[formValues, setFormValues] = useState({
    //     formTitle: '',
    //     formAmount: '',
    //     formDate: ''
    // });

    const titleChangeHandler = (event) => {
        setFormTitle(event.target.value);
        // setFormValues((prevState) => {
        //     return {...prevState, formTitle: event.target.value};
        // });
    }

    const amountChangeHandler = (event) => {
        setFormAmount(event.target.value);
        // setFormValues((prevState) => {
        //     return {...prevState, formAmount: event.target.value};
        // });
    }

    const dateChangeHandler = (event) => {
        setFormDate(event.target.value);
        // setFormValues((prevState) => {
        //     return {...prevState, formDate: event.target.value};
        // });
    }

    const submitHandler = (event) => {
        event.preventDefault(); //Prevents form submission to the server.

        const expenseData = {
            title: formTitle,
            amount: +formAmount,
            date: new Date(formDate)
        }
        props.onSaveExpense(expenseData);
        setFormTitle('');
        setFormAmount('');
        setFormDate('');
    };

    const cancelHandler = () => {
        props.onFormCancel();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={formTitle} onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={formAmount} onChange={amountChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2023-01-01" max="2026-12-31" value={formDate} onChange={dateChangeHandler}/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={cancelHandler}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;