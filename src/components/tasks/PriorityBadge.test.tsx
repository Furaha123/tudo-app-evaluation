import PriorityBadge, { priorityConfig, PriorityLevel } from "../tasks/PriorityBadge";

describe("PriorityBadge", () => {
  describe("Priority Configuration", () => {
    it("has correct configuration for Critical priority", () => {
      const config = priorityConfig.Critical;

      expect(config.level).toBe("Critical");
      expect(config.color).toBe("#ff3131");
      expect(config.label).toBe("Critical");
    });

    it("has correct configuration for High priority", () => {
      const config = priorityConfig.High;

      expect(config.level).toBe("High");
      expect(config.color).toBe("#ff9318");
      expect(config.label).toBe("High");
    });

    it("has correct configuration for Medium priority", () => {
      const config = priorityConfig.Medium;

      expect(config.level).toBe("Medium");
      expect(config.color).toBe("#b624ff");
      expect(config.label).toBe("Medium");
    });

    it("has correct configuration for Low priority", () => {
      const config = priorityConfig.Low;

      expect(config.level).toBe("Low");
      expect(config.color).toBe("#22c55e");
      expect(config.label).toBe("Low");
    });
  });

  describe("Priority Config Completeness", () => {
    it("has configuration for all priority levels", () => {
      const expectedPriorities: PriorityLevel[] = ["Critical", "High", "Medium", "Low"];

      expectedPriorities.forEach((priority) => {
        expect(priorityConfig[priority]).toBeDefined();
        expect(priorityConfig[priority].level).toBe(priority);
        expect(priorityConfig[priority].color).toMatch(/^#[0-9a-f]{6}$/i);
        expect(priorityConfig[priority].label).toBe(priority);
      });
    });

    it("has valid hex colors for all priorities", () => {
      Object.values(priorityConfig).forEach((config) => {
        expect(config.color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it("has correct number of priority levels", () => {
      const priorities = Object.keys(priorityConfig);
      expect(priorities).toHaveLength(4);
    });

    it("priority levels are correctly typed", () => {
      const priorities = Object.keys(priorityConfig);
      expect(priorities).toEqual(["Critical", "High", "Medium", "Low"]);
    });
  });

  describe("Component Exports", () => {
    it("exports PriorityBadge component", () => {
      expect(PriorityBadge).toBeDefined();
      expect(typeof PriorityBadge).toBe("function");
    });

    it("exports priorityConfig object", () => {
      expect(priorityConfig).toBeDefined();
      expect(typeof priorityConfig).toBe("object");
    });
  });

  describe("Priority Color Validation", () => {
    it("Critical priority has red color", () => {
      expect(priorityConfig.Critical.color).toBe("#ff3131");
    });

    it("High priority has orange color", () => {
      expect(priorityConfig.High.color).toBe("#ff9318");
    });

    it("Medium priority has purple color", () => {
      expect(priorityConfig.Medium.color).toBe("#b624ff");
    });

    it("Low priority has green color", () => {
      expect(priorityConfig.Low.color).toBe("#22c55e");
    });
  });
});
