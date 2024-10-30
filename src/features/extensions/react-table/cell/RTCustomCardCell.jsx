const RTCustomCardCell = ({ row }) => {
  return (
    <div>
      <div>{row.original.word}</div>
      <div>{row.original.meaning}</div>
    </div>
  )
}

export default RTCustomCardCell