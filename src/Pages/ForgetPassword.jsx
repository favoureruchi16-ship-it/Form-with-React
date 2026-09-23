import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
   const [email, setEmail] = useState("");

   const [error, setError] = useState("");

   const navigate = useNavigate();

   const handleEmailInput = (e) => {
      setEmail(e.target.value);

      setError("");
   };

   const handleForgotPassword = (e) => {
      e.preventDefault();

      if (!email.trim()) {
         setError("Email is required");
         toast.error("Please enter your email");
         return;
      }

      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
         toast.error("No account found. Please sign up first.");
         return;
      }

      if (email !== savedUser.email) {
         setError("Email does not exist");
         toast.error("Email does not exist");
         return;
      }

      const generatedOTP = Math.floor(100000 + Math.random() * 900000);

      sessionStorage.setItem("otp", generatedOTP.toString());

      console.log("Your OTP is:", generatedOTP);

      toast.success("Email verified successfully!");

      console.log("Forgot password email verified:", email);

      setEmail("");

      navigate("/otp");
   };

   return (
      <section className="forget-password">

         <h1>Forgot your password?</h1>
         <h6>Don’t worry, it happens to all of us. Enter your
            email below to recover your password</h6>

         <form action="" onSubmit={handleForgotPassword} className="form1">
            <label htmlFor="">Email</label>
            <input type="text" className="forget"
               value={email}
               onChange={handleEmailInput}
            />
         </form>
         <button type="submit" onClick={handleForgotPassword} >Recover Password</button>

         <p>
            Remember your password? <Link to="/">Login</Link>
         </p>

      </section>
   );
};

export default ForgetPassword