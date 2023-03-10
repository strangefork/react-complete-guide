import React, {useState} from "react";

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    const [formVisible, setFormVisible] = useState(false);

    const saveExpenseDataHandler = (newExpenseData) => {
        const expenseData = {...newExpenseData, id: Math.random().toString()};
        props.onNewExpense(expenseData);
    };

    const showFormHandler = () => {
        setFormVisible(true);
    };

    const hideFormHandler = () => {
        setFormVisible(false);
    };

    return (
        <div className="new-expense">
            {!formVisible && <button onClick={showFormHandler}>Add New Expense</button>}
            {formVisible && <ExpenseForm onSaveExpense={saveExpenseDataHandler} onFormCancel={hideFormHandler} />}
        </div>
    );
};

export default NewExpense;
