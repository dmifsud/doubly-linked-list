import { LinkedListNode, DoublyLinkedList } from "./index";

export type WizardStep = {
  id: string;
  name: string;
  url: string;
};

export class WizardStepNode extends LinkedListNode<WizardStep, WizardStepNode> {
  setComplete() {
    // ...implementation
  }
}

export class WizardStepList extends DoublyLinkedList<
  WizardStep,
  WizardStepNode,
  WizardStepList
> {
  getById(id: string) {
    let currentStep = this.head;
    while (!!currentStep && currentStep.value.id !== id) {
      currentStep = currentStep.next;
    }
    return currentStep;
  }

  getByUrl(url: string) {
    let currentStep = this.head;
    while (!!currentStep && currentStep.value.url !== url) {
      currentStep = currentStep.next;
    }
    return currentStep;
  }
}

export const makeNewWizardStepList = (wizardSteps: WizardStep[]) => {
  const stepList = new WizardStepList(WizardStepNode);

  wizardSteps.forEach((step) => {
    stepList.push(step);
  });
  return stepList;
};

const dummyList: WizardStep[] = [
  {
    id: "1",
    name: "One",
    url: "/one",
  },
  {
    id: "2",
    name: "Two",
    url: "/two",
  },
  {
    id: "3",
    name: "Three",
    url: "/three",
  },
];

const wizardList = makeNewWizardStepList(dummyList);

console.log(wizardList.head.next.value.id); // prints 2
