import React, {useState} from "react";

import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
    //store the selected year in a stated variable.
    const [filteredYear, setFilteredYear] = useState("2023");

    const yearChangeHandler = (year) => {
        setFilteredYear(year);
    };

    const filteredExpenses = props.items.filter((ele) => ele.date.getFullYear().toString() === filteredYear);

    

    return (
        <div>
            <Card className="expenses">
                <ExpenseFilter onYearChange={yearChangeHandler} selected={filteredYear} />
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    );
};

export default Expenses;
