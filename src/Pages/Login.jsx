import { useState } from "react";
import { toast } from "react-toastify";


const Login = () => {


    const [form, setForm] = useState({
        email: "",
        password: "",
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

    const handleLogin = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        }

        // Password validation
        if (!form.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        // Stop if there are errors
        if (Object.keys(newErrors).length > 0) {
            toast.error("Please fix the errors in the form");
            return;
        }

        // Get saved signup information
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            toast.error("No account found. Please sign up first.");
            return;
        }

        // Check email and password
        if (
            form.email !== savedUser.email ||
            form.password !== savedUser.password
        ) {
            setErrors({
                email: "Invalid email or password",
                password: "Invalid email or password",
            });

            toast.error("Invalid email or password");
            return;
        }

        // Successful login
        toast.success("Login successful!");

        console.log("Login successful:", form);

        // Clear inputs
        setForm({
            email: "",
            password: "",
        });
    };


    return (
        <section className="login">

            <form onSubmit={handleLogin}>

                <h1>Login</h1>
                <h5>login to access your account</h5>

                <label htmlFor="">Email</label>
                <input type="text"
                    value={form.email}
                    name="email"
                    onChange={handleFormInput}
                    className={errors.email ? " input error" : "input"} />

                {errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <br /> <br />


                <label htmlFor="">Password</label>
                <input type="password"
                    value={form.password}
                    name="password"
                    onChange={handleFormInput}
                    className={errors.password ? " input error" : "input"} />

                {errors.password && (
                    <p className="error">{errors.password}</p>
                )}
            </form>

            <div className="check">
                <input type="checkbox" name="" id="" />
                <h5>Remember me</h5>
                <h4 onClick={() => window.location.href = "/forget-password"}>Forgot Password</h4>
            </div>

            <button type="submit" onClick={handleLogin}>Login</button>
            <div className="up">
                <h5>Don’t have an account?</h5>
                <h4 onClick={() => window.location.href = "/register"}>Sign up</h4>
            </div>

        </section>


    )

}
export default Login