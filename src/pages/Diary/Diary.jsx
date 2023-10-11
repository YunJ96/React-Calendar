import SideNav from '../../components/Common/Side';
import Calendar from '../../components/Diary/Calendar';
import Todo from '../../components/Diary/Todo';
import './Diary.modules.scss';

function Diary() {
  return (
    <div>
      <div className='diary-wrap'>
        <SideNav />
        <Calendar />
        <Todo />
      </div>
    </div>
  );
}

export default Diary;
