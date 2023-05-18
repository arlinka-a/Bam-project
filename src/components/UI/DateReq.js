const DateReq = (props) => {
  const date = new Date(props.date);

  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateString = dayOfMonth + "-" + (month + 1) + "-" + year;

  const time = `${date.getHours()}:${date.getMinutes()}`;
  const dateTime = dateString + " " + time;

  return (
    <>
        <p>{dateTime}</p>
    </>
  );
};

export default DateReq;
