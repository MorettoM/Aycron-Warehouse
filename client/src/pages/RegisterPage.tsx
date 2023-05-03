import * as Yup from "yup";
import { Error } from "../components";
import {
  attemptRegister,
} from "../store/thunks/auth";
import { User } from "src/store/actions/user";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button,  Checkbox,  Input } from "antd";
import BGImage from '../assets/warehouse-image-2.jpg'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";

type RegisterFormValues = User;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);

  const { handleServerError } = useServerError();

  const initialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
    isAdmin: false
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = (values: RegisterFormValues) => {
    dispatch(attemptRegister({...values, isAdmin }, navigate))
      .then(() => {})
      .catch(handleServerError);
  };

return <>
          <div className='login-container'>
      <img className="login-bg" src={BGImage} alt="" />
      <div className="bg-filter" />
      <div className="login-card">
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='field'>
          <label htmlFor='email'>Email</label>
          <Input onChange={e => setValue("email", e.target.value)} status={errors.email ? "error" : undefined}  id='email' type='email' placeholder='Email' prefix={<MailOutlined />} />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <Input  status={errors.username ? "error" : undefined} onChange={e => setValue("username", e.target.value)}id='username' type='text' placeholder='Username' size="large" prefix={<UserOutlined />} />
          {errors.username && <Error>{errors.username.message}</Error>}
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <Input status={errors.password ? "error" : undefined} onChange={e => setValue("password", e.target.value)} id='password' type='password' placeholder='Password' size="large" prefix={<LockOutlined />} />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
        <div className='field-checkbox'>
          <label htmlFor='isAdmin'>Admin</label>
          <Checkbox defaultChecked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} id='isAdmin'  />
        </div>


        <Button size="large" className="submit-btn" type="primary" htmlType="submit">Sign Up</Button>
      </form>
      <div className="sign-up-text">
      Already have an account? <Link to='/login'>Sign In</Link>
      </div>
      </div>
    </div>
  </>;
}
