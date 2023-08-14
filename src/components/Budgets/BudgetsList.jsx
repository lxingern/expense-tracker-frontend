import Budget from "./Budget"

const BudgetsList = (props) => {
  const budgets = props.budgets

  return (
    <div>
      {budgets.map(budget => (
        <Budget 
          key={budget.id} 
          budget={budget} 
        />
      ))}
    </div>
  )
}

export default BudgetsList