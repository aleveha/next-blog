import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ProfileForm } from "../src/forms/profile";
import { userAtom } from "../src/states/userState";

const ProfilePage: NextPage = () => {
	const router = useRouter();
	const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		if (!user) {
			router.push("/sign-in");
		}
	}, []);

	if (!user) {
		return null;
	}

	return <ProfileForm user={user} setUser={setUser} />;
};

export default ProfilePage;
