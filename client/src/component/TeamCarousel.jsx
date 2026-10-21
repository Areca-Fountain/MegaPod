import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { teamMembers } from "../data/team.js";

function initials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
}

function TeamCard({ member }) {
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <div className="w-64 shrink-0 mr-8 bg-white/25 backdrop-blur-sm rounded-[40px] p-5 text-center shadow-lg">
            <div className="aspect-square w-full overflow-hidden rounded-[28px] bg-white/30 flex items-center justify-center">
                {imgFailed || !member.image ? (
                    <span className="text-5xl font-bold text-white">{initials(member.name)}</span>
                ) : (
                    <img
                        src={member.image}
                        alt={member.name}
                        width={600}
                        height={600}
                        loading="lazy"
                        draggable={false}
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">{member.name}</h3>
            <p className="text-sm text-white/80">{member.role}</p>

            {member.github && (
                <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-rose-600 transition hover:bg-yellow-300"
                >
                    <FaGithub className="text-lg" />
                    GitHub
                </a>
            )}
        </div>
    );
}

export default function TeamCarousel() {
    // The list is rendered twice and the track slides by exactly 50%,
    // so the loop is seamless. Direction: left -> right.
    const loop = [...teamMembers, ...teamMembers];

    return (
        <div
            className="team-marquee overflow-hidden py-4"
            style={{
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
        >
            <div className="team-marquee-track flex w-max">
                {loop.map((member, i) => (
                    <TeamCard key={i} member={member} />
                ))}
            </div>
        </div>
    );
}