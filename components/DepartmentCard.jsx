"use client"

import deptCard from '@styles/depCard.module.scss'
import { Folder } from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const DepartmentCard = ({ name, href, active }) => {
  return (
    <Link style={{textDecoration: "none"}} href={href}>
      <div className={`${deptCard.wrapper} ${active ? "active": ""}`}>
        <Folder />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default DepartmentCard