import deptCard from '@styles/depCard.module.scss'

const DepartmentCard = () => {
  return (
    <div className={deptCard.wrapper}>
        <img src="/icons/file_white.svg" alt="file_icon" />
        <p>S1</p>
    </div>
  )
}

export default DepartmentCard