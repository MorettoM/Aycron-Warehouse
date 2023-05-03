import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { attemptLogin } from "../store/thunks/auth";
import { Error } from "../components";
import { Credentials } from "src/store/actions/user";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import { Button, Input } from "antd";
import BGImage from '../assets/warehouse-image.jpg'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type LoginFormValues = Credentials;

export default function LoginPage() {
  const { handleServerError } = useServerError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    dispatch(attemptLogin(values, navigate)).catch(handleServerError);
  };

  return (
    <div className='login-container'>
      <img className="login-bg" src={BGImage} alt="" />
      <div className="bg-filter" />
      <div className="login-card">
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <Input status={errors.username ? "error" : undefined} onChange={e => setValue("username", e.target.value)}  id='username' type='text' placeholder='Username' size="large" prefix={<UserOutlined />} />
          {errors.username && <Error>{errors.username.message}</Error>}
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <Input status={errors.password ? "error" : undefined}  onChange={e => setValue("password", e.target.value)} id='password' type='password' placeholder='Password' size="large" prefix={<LockOutlined />} />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>


        <Button size="large" className="submit-btn" type="primary" htmlType="submit">Login</Button>
      </form>
      <div className="sign-up-text">
      Don't have an account? <Link to='/register'>Sign Up</Link>
      </div>
      </div>
    </div>
  );
}
