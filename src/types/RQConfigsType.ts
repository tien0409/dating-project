type RQConfigsType = {
  onMutate?: (_variables?: any) => any;
  onSuccess?: (_data?: any) => void;
  onError?: (_error?: any) => void;
  enabled?: boolean;
};

export default RQConfigsType;
