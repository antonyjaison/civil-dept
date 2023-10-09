'use client'
import deptCard from '@styles/depCard.module.scss'
import Link from "next/link";

const DepartmentCard = ({ name, href }) => {
  return (
    <Link href={href}>
      <div className={deptCard.wrapper}>
        <img src="/icons/file_white.svg" alt="file_icon" />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default DepartmentCard