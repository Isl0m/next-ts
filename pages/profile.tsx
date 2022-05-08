import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import Layout from '../app/components/Layout';
import ProfilePage from '../app/components/ProfilePage';
import { useAuth } from '../app/hooks/useAuth';

const Profile: NextPage = () => {
  const router = useRouter();
  const userInfo = useAuth();
  if (!userInfo.isAuth) {
    router.back();
    return null;
  }
  return (
    <Layout title="Profile Page">
      <ProfilePage {...userInfo} />
    </Layout>
  );
};

export default Profile;
