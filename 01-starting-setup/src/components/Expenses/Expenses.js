import React, {useState} from "react";

import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
    //store the selected year in a stated variable.
    const [filteredYear, setFilteredYear] = useState("2023");

    const yearChangeHandler = (year) => {
        setFilteredYear(year);
    };

    const filteredItems = props.items.filter((ele) => ele.date.getFullYear().toString() == filteredYear);

    let expensesContent = <p>No expenses found.</p>;

    if(filteredItems.length > 0){
        expensesContent = filteredItems.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            date={expense.date}
                        />
                    ))
    }

    return (
        <div>
            <Card className="expenses">
                <ExpenseFilter onYearChange={yearChangeHandler} selected={filteredYear} />
                {expensesContent}
            </Card>
        </div>
    );
};

export default Expenses;
