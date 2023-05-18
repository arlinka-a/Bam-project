import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  // const [mes, setMes] = useState('');

  // useEffect(() => {
  //   fetch("http://localhost:8080/mes")
  //     .then((res) => res.json())
  //     .then((data) => setMes(data.message));
  // }, []);

  // console.log(mes);
   
  return (
    <section className={classes.starting}>
      <h1>ברוכים הבאים לבקשות מדור ב"מ</h1>
      {/* <h3>{mes}</h3> */}
    </section>
  );
};

export default StartingPageContent;
