import Budget from "./Budget"

const BudgetsList = (props) => {
  const budgets = props.budgets

  return (
    <div>
      {budgets.map(budget => (
        <Budget 
          key={budget.budget.id} 
          budget={budget} 
          deleteBudget={props.deleteBudget}
        />
      ))}
    </div>
  )
}

export default BudgetsList