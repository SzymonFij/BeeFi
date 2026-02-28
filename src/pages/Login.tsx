import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocale } from '@/locales'
import styles from './Login.module.css'
import { getLoginApiUrl } from '@/api/userApi'

const t = getLocale('pl')

type FormMode = 'login' | 'register'

export function Login() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState<FormMode>(pathname === '/rejestracja' ? 'register' : 'login')

  useEffect(() => {
    setMode(pathname === '/rejestracja' ? 'register' : 'login')
  }, [pathname])

  const switchMode = (newMode: FormMode) => {
    setMode(newMode)
    navigate(newMode === 'register' ? '/rejestracja' : '/logowanie')
  }
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    postal_code: '',
    street: '',
    house_number: '',
    apartment_number: '',
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginData.email || !loginData.password) {
      setMessage({ type: 'error', text: t.login.errorFields })
      return
    }

    try {
      const res = await fetch(getLoginApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.error) {
        return setMessage({ type: 'error', text: `Błąd logowania: ${data.error}` })
      }
      setMessage({ type: 'success', text: t.login.successLogin });
    } catch (error) {
      setMessage({ type: 'error', text: `Błąd logowania: ${error}` });
    }
    setMessage({ type: 'success', text: t.login.successLogin })
    setLoginData({ email: '', password: '' })
    
    setTimeout(() => {
      setMessage(null)
      navigate('/');
    }, 2000)
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { country, city, postal_code, street, house_number } = registerData
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.phone ||
      !country ||
      !city ||
      !postal_code ||
      !street ||
      !house_number
    ) {
      setMessage({ type: 'error', text: t.login.errorFields })
      return
    }

    if (registerData.password.length < 6) {
      setMessage({ type: 'error', text: t.login.errorPasswordLength })
      return
    }
    
    try {
      const res = await fetch(getLoginApiUrl("/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (data.error) {
        return setMessage({ type: 'error', text: `Błąd rejestracji: ${data.error}` })
      }
      setMessage({ type: 'success', text: t.login.successRegister });
    
      setRegisterData({
        email: '',
        password: '',
        phone: '',
        country: '',
        city: '',
        postal_code: '',
        street: '',
        house_number: '',
        apartment_number: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: `Błąd rejestracji: ${error}` })
    }
    
    setTimeout(() => {
      setMessage(null)
      switchMode('login')
    }, 5000)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {mode === 'login' ? t.login.loginTitle : t.login.registerTitle}
      </h1>
      <p className={styles.subtitle}>
        {mode === 'login' ? t.login.loginSubtitle : t.login.registerSubtitle}
      </p>

      <div className={styles.formWrapper}>
        {message && (
          <div className={`${styles.message} ${styles[`message${message.type === 'error' ? 'Error' : 'Success'}`]}`}>
            {message.text}
          </div>
        )}

        {mode === 'login' ? (
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t.login.loginLabel}</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={styles.input}
                placeholder={t.login.loginPlaceholder}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.login.passwordLabel}</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={styles.input}
                placeholder={t.login.passwordPlaceholder}
              />
            </div>

            <button type="submit" className={styles.button}>
              {t.login.loginButton}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t.login.loginLabel}</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={styles.input}
                placeholder={t.login.loginPlaceholder}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.login.passwordLabel}</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={styles.input}
                placeholder={t.login.passwordPlaceholder}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.login.phoneLabel}</label>
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                className={styles.input}
                placeholder={t.login.phonePlaceholder}
              />
            </div>

            <div className={styles.addressSection}>
              <h3 className={styles.addressSectionTitle}>{t.login.addressSectionTitle}</h3>
              <div className={styles.addressGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.login.countryLabel}</label>
                  <input
                    type="text"
                    name="country"
                    value={registerData.country}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.countryPlaceholder}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.login.cityLabel}</label>
                  <input
                    type="text"
                    name="city"
                    value={registerData.city}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.cityPlaceholder}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.login.postalCodeLabel}</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={registerData.postal_code}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.postalCodePlaceholder}
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.addressFull}`}>
                  <label className={styles.label}>{t.login.streetLabel}</label>
                  <input
                    type="text"
                    name="street"
                    value={registerData.street}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.streetPlaceholder}
                    autoComplete="address-line1"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.login.houseNumberLabel}</label>
                  <input
                    type="text"
                    name="house_number"
                    value={registerData.house_number}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.houseNumberPlaceholder}
                    autoComplete="address-line2"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.login.apartmentNumberLabel}</label>
                  <input
                    type="text"
                    name="apartment_number"
                    value={registerData.apartment_number}
                    onChange={handleRegisterChange}
                    className={styles.input}
                    placeholder={t.login.apartmentNumberPlaceholder}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.button}>
              {t.login.registerButton}
            </button>
          </form>
        )}

        <div className={styles.toggle}>
          {mode === 'login' ? t.login.noAccount : t.login.haveAccount}
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? t.login.registerLink : t.login.loginLink}
          </button>
        </div>
      </div>
    </div>
  )
}
