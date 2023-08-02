const BudgetsList = (props) => {
  const budgets = props.budgets

  return (
    <ul>
      {budgets.map(budget => (
        <li key={budget.id}>
          ${budget.amount}
          {budget.timeframe}
        </li>
      ))}
    </ul>
  )
}

export default BudgetsList