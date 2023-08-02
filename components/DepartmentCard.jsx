'use client'
import deptCard from '@styles/depCard.module.scss'

const DepartmentCard = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className={deptCard.wrapper}>
        <img src="/icons/file_white.svg" alt="file_icon" />
        <p>{name}</p>
    </div>
  )
}

export default DepartmentCard