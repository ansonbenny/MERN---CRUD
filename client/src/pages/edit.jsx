import React from 'react'
import { ClipSvg, TrashSvg } from '../assets'
import { Input } from '../components';

const Edit = ({ isAdd }) => {

    return (
        <section data-page="edit_product" className='p-3'>
            <form action="">
                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 mb-3'>
                    <div>
                        <Input
                            className={"w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none"}
                            placeHolder={'Name'}
                            name={'name'}
                            isRequire />
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Description</label>
                        <textarea
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Description' required />
                    </div>

                    <div>
                        <Input
                            className={"w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none"}
                            placeHolder={'Price'}
                            name={'price'}
                            type={'number'}
                            isRequire />
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Available</label>
                        <select
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Available'
                            name='available'
                            required>
                            <option value="in_stock">Available</option>
                            <option value="out_of">Not Available</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Manufacture</label>
                        <select
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Available'
                            name='available' required>
                            <option value="in_stock">Available</option>
                            <option value="out_of">Not Available</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Model</label>
                        <select
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Available'
                            name='available' required>
                            <option value="in_stock">Available</option>
                            <option value="out_of">Not Available</option>
                        </select>
                    </div>
                </div>

                <div className='primary_img grid grid-cols-2 gap-1 mb-3'>
                    <img className='rounded-md' src='https://downloadfree3d.com/wp-content/uploads/2017/10/3D-Car-Sample.jpg' />

                    <div className="upload rounded-md">
                        <input type="file" accept='image/*' required />

                        <ClipSvg />

                        <label className='text-md font-bold text-grey_black m-2'>Select Image</label>
                    </div>
                </div>

                <div className="selected_imgs">
                    {
                        []?.map((obj, key) => {
                            return (
                                <div className="more">
                                    <img key={key} className='rounded-md' src='https://downloadfree3d.com/wp-content/uploads/2017/10/3D-Car-Sample.jpg' />

                                    <button type='button'>
                                        <TrashSvg />
                                    </button>
                                </div>
                            )
                        })
                    }

                    <div className="upload rounded-md">
                        <input type="file" accept='image/*' required />

                        <ClipSvg />

                        <label className='text-sm font-bold text-grey_black m-1'>Select Images</label>
                    </div>
                </div>

                {
                    //edit // uploading // add
                }
                <button className='border border-blue bg-blue p-2 h-8 flex items-center text-white rounded mt-3'>Add Vehicle</button>
            </form>
        </section>
    )
}

export default Edit