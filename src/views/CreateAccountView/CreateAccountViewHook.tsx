import { useEffect, useMemo, useState } from "react";
import { Form, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";

import { useUploadMultiImageData } from "@/hooks/useUploadData";
import { AxiosResponseType, CreateAccountType, ImageUploadType } from "@/types";
import { convertToFormData } from "@/utils/upload";
import { useCreateProfileData } from "@/hooks/useUsersData";
import { DATING_ROUTE } from "@/configs/routes";

const useCreateAccountView = () => {
  const [genderSelected, setGenderSelected] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const router = useRouter();
  const [form] = Form.useForm<CreateAccountType>();

  const handleUploadSuccess = (res: AxiosResponseType<ImageUploadType[]>) => {
    const imageUrls = res?.data?.map((item) => item.url);
    const payload: CreateAccountType = {
      ...form.getFieldsValue(),
      birthday: new Date(form.getFieldValue("birthday")),
      userPhotos: imageUrls || [],
    };

    createMutate(payload);
  };

  const handleUploadError = () => {
    console.log("error");
  };

  const handleCreateSuccess = async () => {
    await router.push(DATING_ROUTE);
  };

  const handleCreateError = () => {
    console.log("error");
  };

  const { mutate, isLoading: uploadLoading } = useUploadMultiImageData({
    onSuccess: handleUploadSuccess,
    onError: handleUploadError,
  });
  const { mutate: createMutate } = useCreateProfileData({
    onSuccess: handleCreateSuccess,
    onError: handleCreateError,
  });

  const formItemLayout = useMemo(
    () => ({
      labelCol: {
        span: 24,
      },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChangeUpload = ({ fileList: newFileList }: any) => {
    setFileList(newFileList.map((file) => file.originFileObj));
  };

  const handleCancelPreview = () => {
    setPreviewOpen(false);
  };

  const handleSubmit = (values: any) => {
    mutate(convertToFormData({ files: fileList }));
  };

  useEffect(() => {
    form.setFieldValue("gender", genderSelected);
  }, [form, genderSelected]);

  return {
    formItemLayout,
    form,
    genderSelected,
    setGenderSelected,
    previewOpen,
    previewTitle,
    previewImage,
    handleCancelPreview,
    handlePreview,
    handleSubmit,
    handleChangeUpload,
  };
};

export default useCreateAccountView;
