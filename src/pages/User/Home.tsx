// import React from 'react'
// import MainContent from '~/components/User/MainContent'
// import SideNav from '~/components/User/SideNav'
// import ProfileForm from '~/components/User/ProfileForm'

// interface HomeProps {
//   propName?: string
// }

// const Home: React.FC<HomeProps> = ({ propName }) => {
//   return (
//     <div className='min-h-screen flex flex-col m-0'>
//       <div className='flex flex-row justify-start items-stretch px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto'>
//         <SideNav />
//         <MainContent title='Hồ sơ cá nhân' decs='Một số thông tin về bản thân của bạn'>
//           <ProfileForm />
//         </MainContent>
//       </div>
//     </div>
//   )
// }

// export default Home
import React from 'react'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import ProfileForm from '~/components/User/ProfileForm'

interface HomeProps {
  propName?: string
}

const Home: React.FC<HomeProps> = ({ propName }) => {
  return (
    <div className='min-h-screen flex flex-col m-0'>
      <div className='flex flex-row justify-start items-stretch px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto'>
        {/* Sidenav Component */}
        <SideNav />

        {/* Main Content Component */}
        <MainContent title='Hồ sơ cá nhân' decs='Một số thông tin về bản thân của bạn'>
          <div className='flex flex-col gap-4 max-w-md'>
            {/* Profile Form Component */}
            <ProfileForm />
          </div>
        </MainContent>
      </div>
    </div>
  )
}

export default Home
