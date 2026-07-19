import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
	it("sizes lifecycle labels by content rather than icon width", () => {
		render(<Badge>draft</Badge>);

		const badge = screen.getByText("draft");
		expect(badge).not.toHaveClass("size-icon-xl");
		expect(badge.className).toContain("h-[var(--size-icon-xl)]");
		expect(badge).toHaveClass("whitespace-nowrap");
	});
});
