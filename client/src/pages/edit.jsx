import React, { useEffect, useReducer, useState } from 'react'
import { ClipSvg, TrashSvg } from '../assets'
import { Input } from '../components';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { axios } from '../lib'

const reducer = (state, { type, data, isEdit }) => {
    switch (type) {
        case "edit_initial":
            return {
                ...state, form: {
                    ...data,
                    primary: data?.thumbnail,
                    secondary: data?.files
                }
            }
        case "manufacture":
            return { ...state, manufactures: data }
        case "models":
            return { ...state, models: data }
        case "input":
            return {
                ...state, form: {
                    ...state?.form,
                    model: data?.name == 'manufacture' ? "" : state?.form?.model,
                    [data?.name]: data?.value,
                }
            }
        case "primary":
            //if edit add old one to removed

            data.files[0].url = URL.createObjectURL(data?.files?.[0])

            var delete_files;

            if (isEdit) {
                delete_files = state?.form?.delete_files || []

                delete_files.push(state?.form?.primary)
            }

            return {
                ...state, form: {
                    ...state?.form,
                    [data?.name]: data?.files?.[0],
                    delete_files
                }
            }


        case "secondary":
            let files;

            if (state?.form?.[data?.name]?.length > 0) {
                files = [...state?.form?.[data?.name], ...[...data?.files]?.map((obj) => {
                    obj.url = URL.createObjectURL(obj)
                    obj.id = `${Date.now().toString(16)}${obj?.name}`;

                    return obj
                })]
            } else {
                files = [...data?.files]?.map((obj) => {
                    obj.url = URL.createObjectURL(obj)
                    obj.id = `${Date.now().toString(16)}${obj?.name}`;

                    return obj
                })
            }

            return { ...state, form: { ...state.form, [data?.name]: files } }

        case "remove_file":
            var delete_files;

            if (isEdit && data?.path) {
                delete_files = state?.form?.delete_files || []

                delete_files.push(data)
            }

            return {
                ...state, form: {
                    ...state?.form,
                    secondary: state?.form?.secondary?.filter((obj) => obj?.filename !== data?.filename || obj?.id !== data?.id),
                    delete_files
                }
            }


        case "uploading":
            return {
                ...state, uploading: true
            }
        case "uploading_false":
            return {
                ...state, uploading: undefined
            }
        default:
            return state
    }
}

const Edit = ({ isAdd }) => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { location, user } = useOutletContext()

    const [state, action] = useReducer(reducer, {
        form: {
            available: "in_stock"
        }
    })

    const onInputHandle = (e) => {
        if (e?.target?.name == 'primary') {
            action({ type: 'primary', data: e?.target, isEdit: !isAdd })
        } else if (e?.target?.name == 'secondary') {
            action({ type: "secondary", data: e?.target, isEdit: !isAdd })
        } else {
            action({ type: "input", data: e?.target })
        }
    }

    const GetModels = async (e) => {
        action({ type: "input", data: e?.target })

        try {
            let res = await axios.get('/vehicle/get_models', {
                params: {
                    manufacture: e?.target?.value
                }
            })

            if (res?.['data']?.data) {
                action({ type: "models", data: res?.['data']?.data })
            }
        } catch (err) {
            if (err?.response?.data?.status == 405) {
                alert("Login")
                navigate('/login')
            } else {
                alert(err?.response?.data?.message)
            }
        }
    }

    const onUploadProgress = (e) => {
        const { loaded, total } = e;

        let percent = Math.floor((loaded * 100) / total);

        if (percent >= 100) {
            navigate('/')
        } else {
            action({ type: "uploading", data: percent })
        }
    };

    const FormHandle = async (e) => {
        e?.preventDefault?.()


        const formData = new FormData()

        if (id) {
            formData.append('_id', id)
            formData.append('delete_files', JSON.stringify(state?.form?.delete_files || []))
        }

        formData.append('name', state?.form?.name)
        formData.append('description', state?.form?.description)
        formData.append('price', state?.form?.price)
        formData.append('available', state?.form?.available)
        formData.append('manufacture', state?.form?.manufacture)
        formData.append('model', state?.form?.model)
        formData.append('qty', state?.form?.qty)

        formData.append('primary', state?.form?.primary?.name)

        formData.append('file', state?.form?.primary)

        state?.form?.secondary?.forEach((obj) => {
            formData.append('file', obj)
        })

        try {
            let res;

            if (id) {
                res = await axios.put(`/vehicle/edit_vehicle`, formData, {
                    onUploadProgress
                })
            } else {
                res = await axios.post('/vehicle/add_vehicle', formData, {
                    onUploadProgress
                })
            }
        } catch (err) {
            if (err?.response?.data?.status == 405) {
                alert("Login")
                navigate('/login')
            } else {
                action({ type: "uploading_false" })
                alert(err?.response?.data?.message)
            }
        }
    }

    useEffect(() => {
        document.title = "Kale - Product";

        const abortControl = new AbortController();

        if (user) {
            (async () => {
                try {

                    let manufactures = await axios.get('/vehicle/get_manufacture', {
                        signal: abortControl?.signal
                    })

                    action({ type: "manufacture", data: manufactures?.['data']?.['data'] })

                    if (!isAdd) {
                        let res = await axios.get(`/vehicle/get_vehicle/${id}`, {
                            signal: abortControl?.signal
                        })

                        if (res?.['data']?.data) {
                            action({ type: "edit_initial", data: res?.['data']?.data })
                        }
                    }
                } catch (err) {
                    if (err?.code !== "ERR_CANCELED") {
                        alert(err?.response?.data?.message || "Something Went Wrong");
                        navigate("/");
                    }
                }
            })();
        }

        return () => {
            abortControl?.abort?.()
        }

    }, [location, user])

    return (
        <section data-page="edit_product" className='p-3'>
            <form onSubmit={FormHandle}>
                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 mb-3'>
                    <div>
                        <Input
                            className={"w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none"}
                            placeholder={'Name'}
                            name={'name'}
                            value={state?.form?.name || ''}
                            onInput={onInputHandle}
                            isRequire />
                    </div>

                    <div>
                        <Input
                            className={"w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none"}
                            placeholder={'Quantity'}
                            name={'qty'}
                            value={state?.form?.qty || ''}
                            onInput={onInputHandle}
                            isRequire />
                    </div>
                </div>

                <div>
                    <label className='text-sm text-grey_black'>Description</label>
                    <textarea
                        value={state?.form?.description || ''}
                        onInput={onInputHandle}
                        name='description'
                        className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey p-2 outline-none'
                        placeholder='Description' required />
                </div>

                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 mb-3'>
                    <div>
                        <Input
                            className={"w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none"}
                            placeholder={'Price'}
                            name={'price'}
                            type={'number'}
                            value={state?.form?.price || ''}
                            onInput={onInputHandle}
                            isRequire />
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Available</label>
                        <select
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Available'
                            name='available'
                            value={state?.form?.available || ''}
                            onInput={onInputHandle}
                            required>
                            <option value="in_stock">Available</option>
                            <option value="out_of">Not Available</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Manufacture</label>
                        <select
                            onChange={GetModels}
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Manufacture'
                            value={state?.form?.manufacture || ''}
                            name='manufacture' required>
                            <option value={state?.form?.manufacture || ''}>
                                {state?.form?.manufacture || ''}
                            </option>
                            {
                                state?.manufactures?.map((obj, key) => {
                                    return <option key={key} value={obj?.make}>{obj?.make}</option>
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label className='text-sm text-grey_black'>Model</label>
                        <select
                            onInput={onInputHandle}
                            value={state?.form?.model || ''}
                            className='w-full text-grey_black text-sm h-10 bg-white rounded border border-grey pl-2 outline-none'
                            placeholder='Model'
                            name='model' required
                        >
                            <option value={state?.form?.model || ''}>
                                {state?.form?.model || ''}
                            </option>
                            {
                                state?.models?.map((obj, key) => {
                                    return <option key={key} value={obj?.model}>{obj?.model}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className={`primary_img grid ${state?.form?.primary ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mb-3`}>
                    {
                        state?.form?.primary &&
                        <img
                            className='rounded-md'
                            src={state?.form?.primary?.url || `/${state?.form?.primary?.path}`}
                            onClick={() => {
                                window.open(state?.form?.primary?.url || `/${state?.form?.primary?.path}`, "_blank")
                            }}
                        />
                    }

                    <div className="upload rounded-md">
                        <input
                            type="file"
                            name='primary'
                            onInput={onInputHandle}
                            accept='image/*' required={isAdd} />

                        <ClipSvg />

                        <label className='text-md font-bold text-grey_black m-2'>Select Image</label>
                    </div>
                </div>

                <div className="selected_imgs">
                    {
                        state?.form?.secondary?.map((obj, key) => {
                            return (
                                <div className="more" key={key}>
                                    <img
                                        className='rounded-md'
                                        src={obj?.url || `/${obj.path}`}
                                    />

                                    <button type='button' onClick={() => {
                                        action({ type: 'remove_file', data: obj, isEdit: !isAdd })
                                    }}>
                                        <TrashSvg />
                                    </button>
                                </div>
                            )
                        })
                    }

                    <div className="upload rounded-md">
                        <input
                            type="file"
                            accept='image/*'
                            name='secondary'
                            onInput={onInputHandle}
                            multiple
                        />

                        <ClipSvg />

                        <label className='text-sm font-bold text-grey_black m-1'>Select Images</label>
                    </div>
                </div>

                {
                    state?.uploading ? <button type='button' className='border border-blue bg-blue p-2 h-8 flex items-center text-white rounded mt-3'>Uploading...</button>
                        : <button className='border border-blue bg-blue p-2 h-8 flex items-center text-white rounded mt-3'>
                            {
                                isAdd ? 'Add Vehicle'
                                    : 'Edit Vehicle'
                            }
                        </button>
                }
            </form>
        </section >
    )
}

export default Edit