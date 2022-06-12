import { useAtom } from "jotai";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { SignInForm } from "../src/forms/sign-in";
import { userAtom } from "../src/states/userState";

const LoginPage: NextPage = () => {
	const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		if (user) {
			setUser(null);
		}
	}, []);

	return <SignInForm setUser={setUser} />;
};

export default LoginPage;
