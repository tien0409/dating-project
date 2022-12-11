type GenderType = {
  id: string;
  name: string;
  describe?: string;
  isPrivacy: boolean;
  showMeInSearchesAs?: GenderType;
};

export default GenderType;
