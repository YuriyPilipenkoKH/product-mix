'use client'
import '../styles/ButtonStyles.css'
import { logoutUser } from '@/actions/logout-user';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      children: React.ReactNode;
    }
  interface BxProps extends ButtonProps {
    href: string
    label: string
  }  

  export  const BtnX: React.FC<BxProps> = ({ children, ...props }) => {
    const {href, label} = props
    const router = useRouter()
    return <button 
      className="btn btn-primary"
      type='button' 
      {...props}
      onClick={() => router.push(href)} 
      > 
      {label}
      {children}
    </button>;
  };

  export const FlatBtn: React.FC<ButtonProps> = ({ children, ...props }) => {
    return(
     <button 
     className='FlatBtn'
     type='button' 
     {...props}>
       {children}
       </button>
    )
};

export const LogoutButton = () => {
  const handleLogout = async () => {
    const result =  await logoutUser();
    if (result?.success) {
      toast.success(
        result?.message
      );
  };
}
  return (
    <button 
      className="btn btn-primary logout-btn"
      onClick={handleLogout}  >
        Logout
    </button>
  );
};


  export const GetStartedButton: React.FC<ButtonProps> = ({ 
    children, ...props }) => {

    return(
      <button 
        className='GetStarted btn btn-primary'
        type='button' 
        {...props}
         >
          {children}
      </button>
     )
}







