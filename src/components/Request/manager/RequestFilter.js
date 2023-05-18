import classes from './RequestFilter.module.css';

const RequestFilter = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
      };
    
      return (
        <div className={classes.filter}>
          <div className={classes.control}>
            <select value={props.selected} onChange={dropdownChangeHandler}>
              <option value='השחרה'>השחרה</option>
              <option value='אישור כניסה'>אישור כניסה</option>
              <option value='חתימת שוס'>חתימת שוס</option>
              <option value='קידוד חוגר'>קידוד חוגר</option>
            </select>
            <label>סוג בקשה</label>
          </div>
        </div>
      );
};

export default RequestFilter;