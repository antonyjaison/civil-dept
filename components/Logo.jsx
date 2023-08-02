import logo from '@styles/logo.module.scss'
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/' className={logo.logo}>
      Department of <br /> <span>Civil Engineering</span>
    </Link>
  );
};

export default Logo;
