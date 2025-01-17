'use client';
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/authContext";
import { Eye, EyeOff } from 'lucide-react';
import {
  Container,
  Card,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  IconButton,
  ErrorText,
  Button,
  Alert,
  Footer,
  FooterLink
} from './login.styled';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, 'Tiene que tener más de 6 caracteres')
      .matches(/[a-zA-Z]/, 'Tiene que tener al menos una letra')
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setLoginError('');
        await login(values.email, values.password);
      } catch (error: any) {
        setLoginError(error.message || 'Error al iniciar sesión');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <Card>
        <Title>¡Bienvenido!</Title>
        <Subtitle>Inicia sesión para continuar</Subtitle>
        
        <Form onSubmit={formik.handleSubmit}>
          {loginError && (
            <Alert role="alert">
              {loginError}
            </Alert>
          )}
          
          <InputGroup>
            <Label htmlFor="email">
              Correo electrónico
            </Label>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                {...formik.getFieldProps('email')}
              />
            </InputWrapper>
            {formik.touched.email && formik.errors.email && (
              <ErrorText>{formik.errors.email}</ErrorText>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">
              Contraseña
            </Label>
            <InputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                {...formik.getFieldProps('password')}
              />
              <IconButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputWrapper>
            {formik.touched.password && formik.errors.password && (
              <ErrorText>{formik.errors.password}</ErrorText>
            )}
          </InputGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Form>

        <Footer>
          ¿No tienes una cuenta?{' '}
          <FooterLink href="/register">
            Regístrate aquí
          </FooterLink>
        </Footer>
      </Card>
    </Container>
  );
}