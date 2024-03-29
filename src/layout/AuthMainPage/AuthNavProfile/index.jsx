import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentUserData, logOut} from '../../../store/users'
import Loader from '../../../components/common/Loader'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function AuthNavProfile() {
    const user = useSelector(getCurrentUserData())
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logOut())
    }

    if (!user) return <Loader/>
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <Menu.Button
                    className='inline-flex w-full justify-center bg-white px-4 py-2 text-l font-semibold text-slate-500 hover:text-sky-500'
                >
                    {user.name}
                    <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true'/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items
                    className='absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        <Menu.Item>
                            {({active}) => (
                                <Link
                                    to='/user'
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Моя страница
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className='py-1'>
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    onClick={handleClick}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm w-full text-left'
                                    )}
                                >
                                    Выйти
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default AuthNavProfile
