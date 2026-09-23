import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RestPassword = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.password) {
      newErrors.password = "New password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      toast.error("No account found.");
      return;
    }

    const updatedUser = {
      ...savedUser,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Password reset successfully!");

    console.log("Password reset successfully");

    setForm({
      password: "",
      confirmPassword: "",
    });

    sessionStorage.removeItem("otp");

    navigate("/");
  };


  return (

    <section className="reset-password">

      <h1>Reset a password</h1>
      <h6>Your previous password has been reseted.
        Please set a new <br /> password for your account.</h6>
      <form action="" onSubmit={handleResetPassword} className="form1">

        <label hmtlfor="">Create Password</label>
        <input
          type="password"
          value={form.password}
          onChange={handleFormInput}
          name="password"
        />
        <br /> <br />

        <label hmtlfor="">Re-enter Password</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={handleFormInput}
          name="confirmPassword"
        />
        <br /> <br />

      </form>
      <button type="submit" onClick={handleResetPassword}>Set password</button>

    </section>

  )
}

export default RestPassword